const styles = theme => ({
  container: {
    marginTop: 56,
    marginBottom: 100,
  },
  error: {
    color: theme.palette.secondary.main
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    padding: 25,
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    fontWeight: 'bold'
  },
  success: {
    backgroundColor: '#007DFE',
  },
  header: {
    fontFamily: 'AIFont',
    flexGrow: 1,
  }
})

export default styles