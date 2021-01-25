import { Box, Button, Center, Divider, FormControl, FormLabel, Heading, Input, Select, Stack, useToast } from '@chakra-ui/core'
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { postCall } from '../../helpers/apiCall';
import { PageContainer, PageContent } from '../Layout'
import states from '../../helpers/ng.states.json';
import { Image } from '@chakra-ui/react';

export default function NewCustomerData(props) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formDetails, setFormDetails] = useState({
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        hometown: "",
        stateOfOrigin: "",
        localGovernmentArea: "",
        address: "",
        city: "",
        state: "",
        passport: {},
        passportPreview: ""
    })
    const [showPassport, setShowPassport] = useState(false);
    const [lga, setLga] = useState([])
    const toast = useToast()
    const history = useHistory()
    const { user } = useContext(UserContext);
    const { id } = props.match.params

    const stateList = states.states.map((state, index) => (
        <option value={state.name} key={index}>{state.name}</option>
    ))

    let lgaList = lga.map((lga, index) => (<option value={lga.name} key={index}>{lga.name}</option>))
    const lgaListing = (state) => {
        let currentState = states.states.find(search => search.name === state);
        setLga(currentState.local_government_areas)
    }

    const handleChange = (e, name) => {
        e.persist();
        setFormDetails(prev => {
            return { ...prev, [name]: e.target.value }
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        postCall(`customer/data/${id}`, formDetails, user.token).then(res => {
            toast({ status: "success", title: res.message });
            history.push(`/new-customer-employment/${id}`)
        }, err => {
            setIsSubmitting(false);
            toast({
                title: err.message,
                status: "error"
            })
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
                                <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="date"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    value={formDetails.dateOfBirth}
                                    placeholder="Date of Birth"
                                    onChange={(e) => handleChange(e, "dateOfBirth")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="gender">Gender</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="gender"
                                    id="gender"
                                    value={formDetails.gender}
                                    placeholder="Gender"
                                    onChange={(e) => handleChange(e, "gender")}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="maritalStatus">Marital Status</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="maritalStatus"
                                    id="maritalStatus"
                                    value={formDetails.maritalStatus}
                                    placeholder="Marital Status"
                                    onChange={(e) => handleChange(e, "maritalStatus")}>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>
                                </Select>
                            </FormControl>
                            <Divider />
                            <FormControl isRequired>
                                <FormLabel htmlFor="hometown">Hometown</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="hometown"
                                    id="hometown"
                                    value={formDetails.hometown}
                                    placeholder="Hometown"
                                    onChange={(e) => handleChange(e, "hometown")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="stateOfOrigin">State of Origin</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="stateOfOrigin"
                                    id="stateOfOrigin"
                                    value={formDetails.stateOfOrigin}
                                    placeholder="State of Origin"
                                    onChange={(e) => {
                                        handleChange(e, "stateOfOrigin");
                                        lgaListing(e.target.value)
                                    }}
                                >
                                    {stateList}
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="email">Local Government Area</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="localGovernmentArea"
                                    id="localGovernmentArea"
                                    value={formDetails.localGovernmentArea}
                                    placeholder="Local Government Area"
                                    onChange={(e) => handleChange(e, "localGovernmentArea")}
                                >{lgaList}</Select>
                            </FormControl>
                            <Divider />
                            <FormControl isRequired>
                                <FormLabel htmlFor="address">Residential Address</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={formDetails.address}
                                    placeholder="Address"
                                    onChange={(e) => handleChange(e, "address")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="city">City</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={formDetails.city}
                                    placeholder="City"
                                    onChange={(e) => handleChange(e, "city")}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="state">State of Residence</FormLabel>
                                <Select
                                    focusBorderColor="main.500"
                                    name="state"
                                    id="state"
                                    value={formDetails.state}
                                    placeholder="State"
                                    onChange={(e) => handleChange(e, "state")}
                                >
                                    {stateList}
                                </Select>
                            </FormControl>
                            {showPassport ? <Center><Box width="50%">
                                <Image src={formDetails.passportPreview} alt="Customer Pasport" />
                            </Box></Center> : null}
                            <FormControl isRequired>
                                <FormLabel htmlFor="passport">Passport Photograph</FormLabel>
                                <Input
                                    focusBorderColor="main.500"
                                    type="file"
                                    name="passport"
                                    id="passport"
                                    placeholder="Passport Photograph"
                                    onChange={(e) => {
                                        console.log(e.target.files[0]);
                                        setFormDetails(prev => {
                                            return { ...prev, passport: e.target.files[0], passportPreview: URL.createObjectURL(e.target.files[0]) }
                                        });
                                        setShowPassport(true);
                                    }}
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
