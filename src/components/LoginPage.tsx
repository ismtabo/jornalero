import { Button, Input } from '@react95/core'
import { Mprserv120 } from '@react95/icons'
import { Formik } from 'formik'
import { useGoogleLogin } from 'react-google-login'
import { createUseStyles } from 'react-jss'
import WindowFrame from './WindowFrame'

const useStyles = createUseStyles({
  container: {
    width: 'inherit',
    height: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    gap: '2em',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '2em',
    marginBottom: '10px',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, auto)',
    gridTemplateRows: 'repeat(2, auto)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '1em',
    '& input:disabled': {
      background: 'silver',
      color: 'gray',
    },
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5em',
  },
})

export default function LoginWindow() {
  const classes = useStyles()
  const { signIn } = useGoogleLogin({
    clientId:
      '834027039441-jqho0iduddu4kv4tbkke4hscfsiqer6l.apps.googleusercontent.com',
    onRequest: () => {
      console.log(`requesting`)
    },
    onSuccess: (res) => {
      console.log(res)
    },
    onFailure: (err) => {
      console.error(err)
    },
  })
  return (
    <div className={classes.container}>
      <Formik
        initialValues={{
          email: '',
        }}
        validateOnChange={false}
        onSubmit={() => {
          signIn()
        }}
      >
        {({ handleSubmit, handleChange, handleReset, values }) => (
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            <WindowFrame title="Welcome to Celtiberian Workday Register">
              <Mprserv120 />
              <div className={classes.formContainer}>
                <p>Type a email to log on to system by using Google.</p>
                <div className={classes.form}>
                  <label htmlFor="email">Email:</label>
                  <Input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                  <label htmlFor="password">Password:</label>
                  <Input type="password" name="password" disabled />
                </div>
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  type="submit"
                  style={{
                    width: '100%',
                  }}
                >
                  Ok
                </Button>
                <Button
                  type="reset"
                  style={{
                    width: '100%',
                  }}
                >
                  Cancel
                </Button>
              </div>
            </WindowFrame>
          </form>
        )}
      </Formik>
    </div>
  )
}
