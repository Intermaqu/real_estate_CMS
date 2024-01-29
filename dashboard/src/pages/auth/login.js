import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState("email");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Logowanie:", loginData);
    try {
      await auth.signIn(loginData.email, loginData.password);
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Devias Kit</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
            </Stack>
            <Tabs sx={{ mb: 3 }} value={method}>
              <Tab label="Email" value="email" />
            </Tabs>
            {method === "email" && (
              <form noValidate onSubmit={handleLoginSubmit}>
                <Stack spacing={3}>
                  <TextField
                    // error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    // helperText={formik.touched.email && formik.errors.email}
                    label="Email"
                    name="email"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    type="email"
                    value={loginData.email}
                  />
                  <TextField
                    // error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    // helperText={formik.touched.password && formik.errors.password}
                    label="Hasło"
                    name="password"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    type="password"
                    value={loginData.password}
                  />
                </Stack>
                {
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {error}
                  </Typography>
                }
                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                  Zaloguj
                </Button>
                <Alert color="primary" severity="info" sx={{ mt: 3 }}>
                  <div>Hasło powinno mieć przynajmniej 8 znaków.</div>
                </Alert>
              </form>
            )}
            {method === "phoneNumber" && (
              <div>
                <Typography sx={{ mb: 1 }} variant="h6">
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
