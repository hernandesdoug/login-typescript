import Icone from '../../assets/icone.jpg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from "../../services/api";
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [fullName, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [dateBirth, setDate] = useState<string>("");
    const [phoneNumber, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [nationality, setNation] = useState<string>("");
    const [docType, setDocType] = useState<string>("");

    const navigate = useNavigate();

    const cancelForm = () => {
        navigate('/'); 
    }
    
    async function formUser() {
        try {
            const response = await api.post(`/`, { email: email, 
                fullName: fullName,
                dateBirth: dateBirth,
                phoneNumber: phoneNumber,
                nationality: nationality,
                docType: docType,
                password: password });
                console.log(response.data);
            if (response.status === 200) {
                const id = response.data.id;
                const url = `signon/${id}`;
                window.location.href = url;
            } else {
                console.log("Failed to insert data!", response.status);
            }
        } catch (error) {
            console.error("Unexpected error!", error);
        }
    }
    return (
    <>
        <Background>
        <Container>
            <Title>
                <img src={Icone} alt="company icon"/>
                <h1>Sign Up</h1>
                <Texts>Enter your details below to create your account and get started.</Texts>
            </Title>
            <FormContainer>
                <FormLeft>
                    <Labels htmlFor="full-name">Full Name</Labels>
                    <Inputs type="text" placeholder="enter..." id="full-name" value={fullName} onChange={e => setName(e.target.value)}/>
                    <br/>
                    <Labels htmlFor="date-birth">Date of Birth</Labels>
                    <Inputs type="date" placeholder="DD/MM/AAAA" id="date-birth" value={dateBirth} onChange={e => setDate(e.target.value)} />
                    <br/>
                    <Labels htmlFor="select-nat">Nationality</Labels>
                    <SelectOpt value={nationality} onChange={e => setNation(e.target.value)} >
                        <option value="">Select</option>
                        <option value="Brazil">Brazil</option>
                        <option value="United States">United States</option>
                        <option value="Argentina">Argentina</option>
                    </SelectOpt>
                    <br/>
                    <Labels htmlFor="password">Password</Labels>
                    <Inputs type="password" placeholder="enter..." id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <br/>
                    <BtnCancel onClick={cancelForm}>Cancel</BtnCancel>
                </FormLeft>
                <FormRight>
                    <Labels htmlFor="email">Email</Labels>
                    <Inputs type="email" placeholder=" enter email..." id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <br/>
                    <Labels htmlFor="phone-number">Phone Number</Labels>
                    <Inputs type="tel" pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}" placeholder="(XX) XXXXX-XXXX"  id="phone-number" value={phoneNumber} onChange={e => setPhone(e.target.value)}/>
                    <br/>
                    <Labels htmlFor="select-doc">ID Type</Labels>
                    <SelectOpt value={docType} onChange={e => setDocType(e.target.value)}>
                        <option value="">Select</option>
                        <option value="CPF">CPF</option>
                        <option value="RG">RG</option>
                        <option value="CNH">CNH</option>
                    </SelectOpt>
                    <br/>
                    <Labels htmlFor="password">Confirm Password</Labels>
                    <Inputs type="password" placeholder="enter..." id="cf-password" value={password} onChange={e => setPassword(e.target.value)}  />
                    <br/>
                    <BtnConfirm onClick={formUser}>Confirm</BtnConfirm>
                </FormRight>      
            </FormContainer>
            <BottomTxt>Already have an account? <Link to={"/"} >Login</Link></BottomTxt>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 1100px;
    height: 650px;
    background: #fff;
    border-radius: 1rem;
    padding: 10px;
    margin: 5px;
`;

const Title = styled.div`
    padding-left: 40px;
`;

const FormContainer = styled.form`
    background: #fff;
    border-radius: 1rem;
    height: 400px;
    margin: 20px auto;
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    gap: 10px;
    padding: 25px 50px;
`;

const Inputs = styled.input`
    width: 400px;
    height: 30px;
    border-radius: 0.3rem;
`;

const Labels = styled.label`
    position: relative;
    text-align: left;
    width: 400px;
    height: 30px;
    margin-bottom: 0%;
`;

const BtnConfirm = styled.button`
    width: 400px;
    height: 30px;
    margin-top: 5px;
    border-radius: 0.3rem;
    border: 0.3px solid;
    background-color: rgb(36, 36, 171);
    color: #fff;
`;

const BtnCancel = styled.button`
    width: 400px;
    height: 30px;
    margin-top: 5px;
    border-radius: 0.3rem;
    border: 0.3px solid;
    background-color: white;
`;

const SelectOpt = styled.select`
    width: 400px;
    height: 30px;
    border-radius: 0.3rem;
`;

const FormLeft = styled.div`
    width: 500px;
    height: 400px;
    border: 0;
    border-radius: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
`;

const FormRight = styled.div`
    width: 500px;
    height: 400px;
    border: 0;
    border-radius: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
`;

const Texts = styled.p`
    color: #747775;
`;

const BottomTxt = styled.div`
    color: #747775;
    text-align: center;
   justify-content: center;
   align-content: center;
`;
export default Signup;