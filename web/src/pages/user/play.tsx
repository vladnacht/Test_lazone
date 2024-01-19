import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
// import { useRouter } from "next/router";
import { Wrapper } from "../../components/Wrapper";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useCountdown } from "../../components/useCountdown";
import { Form, Formik } from "formik";
import { CircularProgress, CircularProgressLabel, Box, Button, Spacer, Heading } from "@chakra-ui/react"
import { useGetAllQuestion } from "../../generated/graphql";

const Quiz: NextPage = () => {
//   const router = useRouter();
const { seconds } = useCountdown(60)
const [{ data }] = useGetAllQuestion();

const info = data?.getQuestion
console.log("info :", info);


const handleResponse = (e:) => {

} 

  return (
    <Wrapper variant="small">
        <Formik
            initialValues={{ answers: {} }}
            onSubmit={(e)=> handleResponse(e)}
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
                            <Box p='4'>
                                <Button colorScheme='green.500'>Yes</Button>
                            </Box>
                            <Spacer />
                            <Box p='4'>
                                <Button colorScheme='red.500'>No</Button>
                            </Box>
                    </Form>
                )
            }
        </Formik>

    </Wrapper>
  )

  
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Quiz);