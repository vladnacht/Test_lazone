import React from 'react'
import {
    Alert,
  AlertIcon,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { Form, Formik, Field } from 'formik'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Wrapper } from '../components/Wrapper'
import { Box, Button } from "@chakra-ui/react";
import { InputField } from '../components/InputField'
import { useRouter } from 'next/router'
import { useLoginMutation } from '../generated/graphql'

interface ILoginProps {}

const Login: NextPage<ILoginProps> = () => {
    const init = { username: "", password: "" }
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const router = useRouter();
    const [, login] = useLoginMutation();
    const [errshow, setErrShow] = React.useState(false)
    const [logon, setLogOn] = React.useState(false)
    const [con, setCon] = React.useState(false)

    const validateInput = (valid: any) => {
        let err
        if (!valid) {
            err = "This case is required";
        }
        return err;
    }

    const handleLogin = async (e: any) => {
        try {
            const response = await login({ input: e })
            const log = response.data?.login
            const err = response.error?.message
            if (log) {
                setLogOn(true)
                router.push(`user/${log.username}`)
            } else if (err){
                setErrShow(true)
            }
        } catch (error) {
            setCon(true)
        }
    }

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={init}
                onSubmit={async(values) => handleLogin(values)}
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
