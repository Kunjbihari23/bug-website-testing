'use client';
import {
  Button,
  TextInput,
  Textarea,
  Group,
  Box,
  Title,
  Divider,
  Grid,
  Container,
  ActionIcon,
  em,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import style from './StaticPages.module.css';
import { error_red_color, secondary_dark } from '@/constant/FontColotConstant';
import { useContactInquiry } from '@/state/Contact/contact.hook';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';

function ContactUs() {
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const form = useForm({
    initialValues: {
      Name: '',
      ContactNumber: '',
      Email: '',
      Comments: '',
    },

    validate: {
      Name: (value) => (value.length < 2 ? 'Name must have at least 2 characters' : null),
      ContactNumber: (value) => (/^\d+$/.test(value) ? null : 'Phone number must contain only digits'),
      Email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      Comments: (value) => (value.length > 0 ? null : 'Description is required'),
    },
  });

  const { mutate: postContactData, isPending: signupPending } = useContactInquiry((data) => {
    if (data?.statusCode === 200) {
      notifications.show({
        title: 'Thank you!',
        message: 'Inquiry submitted! We’re excited to connect with you soon.',
        color: 'green',
      });
      handleReset();
    } else if (data?.error) {
      notifications.show({
        title: 'Something went wrong please try again',
        color: 'red',
      });
      handleReset();
    }
  });

  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append('Name', values.Name);
    formData.append('ContactNumber', values.ContactNumber);
    formData.append('Email', values.Email);
    formData.append('Comments', values.Comments);
    postContactData(formData);
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <div>
      <Box mx="auto" mb={20} h={100} mt={-10}>
        <div className={style.about_banner}>
          <Title order={1} style={{ color: 'white', fontWeight: 600 }}>
            CONTACT US
          </Title>
        </div>
      </Box>

      <Container size={'lg'}>
        <Box
          sx={{
            padding: '2rem',
            backgroundColor: '#f9f9f9',
          }}
        >
          <Grid mb={50} mt={50} className={style.contactForm}>
            <Grid.Col span={{ bash: 12, sm: 12, md: 7 }} p={40}>
              <Title order={2}>Get In Touch</Title>
              <Divider my="sm" />

              <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="Your Name" placeholder="Your Name" {...form.getInputProps('Name')} mb="sm" />
                <Group grow mb="sm">
                  <TextInput label="Phone Number" placeholder="Phone" {...form.getInputProps('ContactNumber')} />
                  <TextInput label="Email Address" placeholder="Email" {...form.getInputProps('Email')} />
                </Group>
                <Textarea
                  label="Description"
                  placeholder="Comments"
                  autosize
                  minRows={3}
                  {...form.getInputProps('Comments')}
                  mb="sm"
                />

                <Group mt="md">
                  <Button type="submit" color={secondary_dark}>
                    Submit
                  </Button>
                  <Button type="button" onClick={handleReset} color={error_red_color}>
                    Reset
                  </Button>
                </Group>
              </form>
            </Grid.Col>

            <Grid.Col span={{ bash: 12, sm: 12, md: 5 }} p={40}>
              <Title order={3} color="blue">
                Contact Details
              </Title>

              <Group mt="xl">
                <ActionIcon variant="default" color="rgba(252, 237, 28, 1)" size="xl" aria-label="Settings">
                  <IconPhone size={24} />
                </ActionIcon>

                <Box>
                  <Title order={5}>Call Us At</Title>
                  <p>+91 92653 20742</p>
                </Box>
              </Group>

              <Group mt="xl">
                <ActionIcon variant="default" color="rgba(252, 237, 28, 1)" size="xl" aria-label="Settings">
                  <IconMail size={24} />
                </ActionIcon>

                <Box>
                  <Title order={5}>Email Us</Title>
                  <p>enquiry@easyprops.com</p>
                </Box>
              </Group>

              <Group mt="xl">
                <ActionIcon variant="default" color="rgba(252, 237, 28, 1)" size="xl" aria-label="Settings">
                  <IconMapPin size={24} />
                </ActionIcon>

                <Box>
                  <Title order={5}>Location</Title>
                  <p>
                    A 803/804/805/302, Shapath Hexa,
                    <br /> Near Ganesh Meridian, Sola Bridge,
                    <br /> Ahmedabad-380060.
                  </p>
                </Box>
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default ContactUs;
