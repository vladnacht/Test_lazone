import React from "react";
import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { Box, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";

interface IRegisterProps {}

const Register: NextPage<IRegisterProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const init ={ username: "", email: "", password: "", firstName: "", lastName: ""  }
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [signup, setSignUp] = React.useState(false)
  const [errsignup, setErrSignUp] = React.useState(false)
  const [con, setCon] = React.useState(false);
  const handleSubmit = async(val: any) => {
    try {
      const response = await register({ input: val });
      const user = response.data?.register;
      const err = response.error?.message
      if (user) {
          setSignUp(true)
          router.push(`user/${user.username}`);
      } else if (err) {
        setErrSignUp(true)
      }
    } catch (error) {
      setCon(true)
    }
  }
  
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={init}
        onSubmit={(values) => handleSubmit(values)}
         
      >
        {({ isSubmitting }) => (
          <Form>
                <Box mt={4}>
                  <InputField
                    name="username"
                    placeholder="username"
                    label="Username"
                    type="text"
                  />
                </Box>
                <Box mt={4}>
                  <InputField 
                    name="lastName"
                    label="Lastname"
                    placeholder="Enter your lastname"
                    type="text"
                  />
                </Box>
                <Box mt={4}>
                  <InputField 
                    name="firstName"
                    label="Firstname"
                    placeholder="Enter your firstname"
                    type="text"
                  />
                </Box>
                  <Box mt={4}>
                    <InputField
                      name="email"
                      placeholder="email"
                      label="Email"
                      type="email"
                    />
                  </Box>
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
              mt={4}
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              register
            </Button>

            {
                  signup ?
                  <Alert status='success'>
                      <AlertIcon />
                      Inscription réussie
                  </Alert>
                  : errsignup ?
                  <Alert status='error'>
                      <AlertIcon />
                      Email ou username déjà existant
                  </Alert>
                  : con ? 
                    <Alert status='info'>
                        Problème de connexion. Veuillez vérifier votre connexion et rééssayer
                        <AlertIcon />
                    </Alert>
                    : null
              }
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);
