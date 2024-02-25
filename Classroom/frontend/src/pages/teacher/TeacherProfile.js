import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <>
      <ProfileCard>
        <ProfileCardContent>
          
          <ProfileText className="title-total">
            <ProfileText className="title">Teacher Profile</ProfileText>
            <ProfileText>Name: {currentUser.name}</ProfileText>
            <ProfileText>Email: {currentUser.email}</ProfileText>
            <ProfileText>Class: {teachSclass.sclassName}</ProfileText>
            <ProfileText>Subject: {teachSubject.subName}</ProfileText>
            <ProfileText>School: {teachSchool.schoolName}</ProfileText>
          </ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </>
  )
}

export default TeacherProfile;

const ProfileCard = styled(Card)`

border: 1px solid #ccc;
border-radius: 10px;
padding: 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
background-color: #95B9C7;
color: black;
width: 80%; /* Adjust the width as needed */
max-width: 400px; /* Optionally, set a maximum width */
margin: auto; /* Center the container horizontally */
margin-top: 10vh; /* Center the container vertically */
border-radius: 90px;
   
  
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled(Typography)`
  margin: 10px;
`;