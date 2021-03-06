import { Box, FormControl, FormLabel, Button, Input, Stack, Heading } from '@chakra-ui/core';
import cogoToast from 'cogo-toast';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { UserStateContext } from '../../contexts/UserContext';
import { postCall } from '../../helpers/apiCall';
import { PageContainer } from '../Layout';
import { PageContent } from "../Layout/PageContent";

export default function NewCustomer() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formDetails, setFormDetails] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    })

    const history = useHistory()
    const user = useContext(UserStateContext);

    const handleChange = (e, name) => {
        e.persist();
        setFormDetails(prev => {
            return { ...prev, [name]: e.target.value }
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        postCall("customer/create", formDetails, user.token).then(res => {
            console.log(res);
            cogoToast.success(res.message);
            history.push(`/new-customer-data/${res.data.id}`)
        }, err => {
            setIsSubmitting(false);
            cogoToast.error(err.message);
        })
    };
    return (
        <PageContent
            title="New Customer"
        >
            <PageContainer>
                <Box
                    width={{ base: "90%", md: "400px" }}
                    bg="secondary.card"
                    rounded="lg"
                    p={5}
                >
                    <Heading marginBottom="1.5rem">Basic Data</Heading>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <Stack spacing={4} marginBottom="1rem">
                            <FormControl isRequired>
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formDetails.firstName}
                                    placeholder="First Name"
                                    onChange={(e) => handleChange(e, "firstName")}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="middleName">Middle Name</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="middleName"
                                    id="middleName"
                                    value={formDetails.middleName}
                                    placeholder="Middle Name"
                                    onChange={(e) => handleChange(e, "middleName")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formDetails.lastName}
                                    placeholder="Last Name"
                                    onChange={(e) => handleChange(e, "lastName")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="tel"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={formDetails.phoneNumber}
                                    placeholder="Phone Number"
                                    onChange={(e) => handleChange(e, "phoneNumber")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="email">Email Address</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formDetails.email}
                                    placeholder="Email"
                                    onChange={(e) => handleChange(e, "email")}
                                />
                            </FormControl>
                        </Stack>
                        <Stack marginBottom="1rem">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Please wait.."
                                colorScheme="main"
                            >
                                Next
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </PageContainer>
        </PageContent>
    )
}
