import Icone from '../../assets/icone.jpg';
import styled from 'styled-components';
import api from "../../services/api";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function signOn() {
    const { id } = useParams();
    const [fullName, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [dateBirth, setDate] = useState<string>("");
    const [phoneNumber, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [nationality, setNation] = useState<string>("");
    const [docType, setDocType] = useState<string>("");

    const navigate = useNavigate();
    const logoutProfile = () => {
        navigate('/');
    }
   
    async function updateProfile() {
        try {
            const response = await api.put(`/${id}`, { email: email, 
                fullName: fullName,
                dateBirth: dateBirth,
                phoneNumber: phoneNumber,
                nationality: nationality,
                docType: docType,
                password: password });
            console.log(response.data);
            if (response.status === 200) {
               alert("User updated successfully!")
            } else {
                console.log("Failed to update data!", response.status);
            }
        } catch (error) {
            console.error("Unexpected error!", error);
        }
    }
    async function deleteProfile() {
        try {
            const response = await api.delete(`/${id}`);
            if (response.status === 200) {
                alert("User deleted successfully!")
            } else {
                console.log("Failed to delete user!", response.status);
            }
        } catch (error) {
            console.error("Unexpected error!", error);
        }
    }

    async function recoverProfile() {

        try {
            const response = await api.get(`/${id}`);
            console.log(response.data);
            if (response.status === 200) {
                setName(response.data.fullName);
                setEmail(response.data.email);
                setDate(response.data.dateBirth);
                setPhone(response.data.phoneNumber);
                setPassword(response.data.password);
                setNation(response.data.nationality);
                setDocType(response.data.documentType);
            } else {
                console.log("Failed to recover data!", response.status);
            }
        } catch (error) {
            console.error("Unexpected error!", error);
        }
    }

    useEffect(() => {
        recoverProfile();
    }, [])

    return (
        <>
            <Background>
                <Container>
                    <Title>
                        <img src={Icone} alt="company icon" />
                        <h1>Welcome!</h1>
                    </Title>
                    <Section>
                        <Labels htmlFor="full-name">Full Name</Labels>
                        <Inputs type="text" id="full-name" value={fullName} onChange={e => setName(e.target.value)} />
                        <Labels htmlFor="email">Email</Labels>
                        <Inputs type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <Labels htmlFor="date-birth">Date of Birth</Labels>
                        <Inputs type="date" id="date-birth" value={dateBirth} onChange={e => setDate(e.target.value)} />
                        <Labels htmlFor="phone-number">Phone Number</Labels>
                        <Inputs type="tel" pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}" id="phone-number" value={phoneNumber} onChange={e => setPhone(e.target.value)} />
                        <Labels htmlFor="password">Password</Labels>
                        <Inputs type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <Labels htmlFor="nationality">Nationality</Labels>
                        <Inputs type="text" id="nationality" value={nationality} onChange={e => setNation(e.target.value)} />
                        <Labels htmlFor="document-type">ID Type</Labels>
                        <Inputs type="text" id="document-type" value={docType} onChange={e => setDocType(e.target.value)} />
                    </Section>
                    <Buttons>
                        <button onClick={updateProfile}>Update</button>
                        <button onClick={deleteProfile}>Delete</button>
                        <button onClick={logoutProfile}>Logout</button>
                    </Buttons>
                </Container>
            </Background>
        </>
    )
}

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgb(190, 215, 237);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;    
`;

const Container = styled.div`
    width: 500px;
    height: 550px;
    background: #fff;
    border-radius: 1rem;
`;

const Title = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Section = styled.section`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Labels = styled.label`
    display: flex;
    width: 200px;
    height: 20px;
`;

const Inputs = styled.input`
    display: flex;
    width: 200px;
    height: 20px;
    margin-bottom: 5px;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 0 30px;
    margin-top: 5px;
`;

export default signOn;