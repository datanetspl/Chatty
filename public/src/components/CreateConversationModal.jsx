import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`;

const CreateConversationModal = ({ isOpen, onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState('');
  const [userName, setUserName] = useState('');

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === 'modalBackground') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName && userName) {
      onSubmit({ groupName, userName });
      setGroupName('');
      setUserName('');
    }
  };

  return (
    <ModalBackground id="modalBackground">
      <ModalContainer>
        <Header>
          <Title>Create Group Chat</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="groupName">Group Name</Label>
          <Input
            type="text"
            id="groupName"
            name="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
          <Label htmlFor="userName">User Name</Label>
          <Input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <SubmitButton type="submit">Create Group</SubmitButton>
        </Form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default CreateConversationModal;