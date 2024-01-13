import React from 'react'
import {
  FormControl
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Wrapper } from '../components/Wrapper'
import { Box, Button } from "@chakra-ui/react";
import { InputField } from '../components/InputField'

interface ILoginProps {}

const Login: NextPage<ILoginProps> = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values) => {
                        console.log(values);
                }}
            >
                {
                    ({isSubmitting}) => (
                        <Form>
                            <FormControl>
                                <InputField 
                                    label='username'
                                    name='username'
                                    type='text'
                                    placeholder='Enter your username'
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
                        </Form>
                    ) 
                }
            </Formik>
        </Wrapper>
    )
}  

export default withUrqlClient(createUrqlClient, { ssr: true })(Login)
