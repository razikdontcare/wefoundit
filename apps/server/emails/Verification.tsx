import {
  Button,
  Html,
  Container,
  Tailwind,
  Body,
  Heading,
  Head,
  Text,
  Preview,
  Hr,
  Section,
  Link,
} from "@react-email/components";
const user = "John Doe";
const link = "https://wefoundit.com/verify-email?token=1234567890";
export const VerificationEmail = () => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body
          className="flex flex-col items-center justify-center pt-10 bg-[#1C1F23] text-[#F3F4F6]"
          style={main}
        >
          <Preview>WeFoundIt Email Verification</Preview>
          <Container className="flex flex-col items-center justify-center h-full text-center px-8">
            <Section>
              <Heading as="h2" className="font-bold text-5xl">
                We<span className="text-[#3B82F6]">Found</span>It
              </Heading>
            </Section>
            <Section>
              <Text className="text-xl">
                Halo <span className="font-bold">{user},</span>
              </Text>
              <Text>
                Terima kasih sudah mendaftar. Untuk melengkapi proses
                pendaftaran dan mengamankan akun Anda, silakan verifikasi alamat
                email ini dengan mengklik tombol di bawah.
              </Text>
              <Button
                href={link}
                className="bg-[#3B82F6] px-4 py-2 font-bold text-lg rounded-md text-[#F3F4F6]"
              >
                Verifikasi Email
              </Button>
            </Section>
            <Hr className="py-2" />
            <Section>
              <Container>
                <Text className="container mx-auto text-xs max-w-xs">
                  Jika tombol di atas tidak berfungsi, Anda dapat menyalin dan
                  menempelkan link berikut ke browser Anda:{" "}
                </Text>
                <Link href={link}>{link}</Link>
              </Container>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

const main = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

export default VerificationEmail;
