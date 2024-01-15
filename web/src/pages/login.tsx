import React from 'react'
import {
    Alert,
  AlertIcon,
  FormControl
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Wrapper } from '../components/Wrapper'
import { Box, Button } from "@chakra-ui/react";
import { InputField } from '../components/InputField'
import { useRouter } from 'next/router'
import { useLoginMutation } from '../generated/graphql'

interface ILoginProps {}

const Login: NextPage<ILoginProps> = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const router = useRouter();
    const [, login] = useLoginMutation();
    const [errshow, setErrShow] = React.useState(false)
    const [logon, setLogOn] = React.useState(false)
    const [con, setCon] = React.useState(false)

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async(values) => {
                    try {
                        const response = await login({ input: values })
                        const log = response.data?.login
                        const err = response.error?.message
                        if (log) {
                         setLogOn(true)
                         setTimeout(() => {
                             router.push(`user/${log.username}`)
                         }, 1000)
                        } else if (err){
                         setErrShow(true)
                        }
                    } catch (error) {
                        setCon(true)
                    }
                }}
            >
                {
                    ({isSubmitting}) => (
                        <Form>
                            <FormControl>
                                <InputField 
                                    label='Username'
                                    name='username'
                                    type='text'
                                    placeholder='Enter username'
                                /> 
                            </FormControl>
                            <Box mt={4}>
                                <InputField
                                label='Password'
                                name='password'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                />
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </Box>
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                mt={4}
                                colorScheme="blue"
                                >
                                Login
                            </Button>
                            {
                                logon ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Connexion réussie
                                </Alert>
                                : errshow ?
                                <Alert status='error'>
                                    <AlertIcon />
                                    Username ou Mot de passe incorrect
                                </Alert>
                                : con ? 
                                    <Alert status='info'>
                                        Problème de connexion. Veuillez vérifier votre connexion et rééssayer
                                        <AlertIcon />
                                    </Alert>
                                    : null
                            }
                        </Form>
                    ) 
                }
            </Formik>
        </Wrapper>
    )
}  

export default withUrqlClient(createUrqlClient, { ssr: true })(Login)
