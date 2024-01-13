import React from "react";
import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { Box, Button } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";

interface IRegisterProps {}

const Register: NextPage<IRegisterProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values) => {
          const response = await register({ input: values });
          const user = response.data?.register;
          if (user) {
            router.push(`user/${user.username}`);
          }
        }}
         
      >
        {({ isSubmitting }) => (
          <Form>
                  <InputField
                    name="username"
                    placeholder="username"
                    label="Username"
                  />
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
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);
