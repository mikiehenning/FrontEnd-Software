import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Button,ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

const buttonGroupInstance = () =>(
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
  

  <ButtonGroup vertical>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </ButtonGroup>

);

ReactDOM.render(buttonGroupInstance, mountNode);
