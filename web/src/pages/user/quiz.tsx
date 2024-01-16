import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
// import { useRouter } from "next/router";
import { Wrapper } from "../../components/Wrapper";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useCountdown } from "../../components/useCountdown";
import { Form, Formik } from "formik";
import { CircularProgress, CircularProgressLabel, Flex, Box, Button, Spacer, Heading, Center } from "@chakra-ui/react"

const Quiz: NextPage = () => {
//   const router = useRouter();
const { seconds } = useCountdown(60)

  return (
    <Wrapper variant="small">

        <Formik
            initialValues={{ answers: {} }}
            onSubmit={
                async(values) => {
                    console.log("Values", values);
                }
            }
        >
            {
                ({isSubmitting}) => (
                    <Form style={{
                        alignItems: "center"
                    }}>
                        <CircularProgress value={seconds} max={60} color='green.400' size='200px' style={{
                            alignItems: "center",
                        }}>
                            <CircularProgressLabel>{seconds}</CircularProgressLabel>
                        </CircularProgress>
                        <Heading as='h4' size='md' style={{
                            padding: 20
                        }}>
                            Cet acteur a t-il joué dans ce film ?
                        </Heading>
                        <Flex>
                            <Box p='4'>
                                <Button colorScheme='green.500'>Yes</Button>
                            </Box>
                            <Spacer />
                            <Box p='4'>
                                <Button colorScheme='red.500'>No</Button>
                            </Box>
                        </Flex>
                    </Form>
                )
            }
        </Formik>

    </Wrapper>
  )

  
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Quiz);