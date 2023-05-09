import { useState } from 'react';
import {
  Container,
  Header,
  Text,
  Group,
  Box, CloseButton, Button,
  Title
} from '@mantine/core';
import {
  Link
} from "react-router-dom";

export default function Filters() {
  return (
    <>
      <Group>
        <Title order={3} fz="lg" sx={{ fontFamily: 'Poppins' }}>Фильтры</Title>
      </Group>
    </>
  )
}
