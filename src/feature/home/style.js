const styles = () => ({
  root: {
    flexGrow: 1,
    marginBottom: 55
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  gridroot: {
    background: '#0d664a',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  childroot: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  bodyContentsRoot: {
    display: 'flex',
    background: `url(${process.env.PUBLIC_URL}/img/itembg2.jpg) top center no-repeat`,
    backgroundSize: '100% 160px',
    padding: '3px 0 0 0'
  },
  gridList: {
    paddingTop: '1rem',
    fontSize: 12,
    width: '20%',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  },
  container: {
    marginTop: 56
  },
  header: {
    fontFamily: 'AIFont',
    flexGrow: 1,
  },
  bodyTitle: {
    background: `url(${process.env.PUBLIC_URL}/img/itembg3.png) top center no-repeat`,
    backgroundSize: '100% 100%',
    color: '#fff',
    minWidth: 80,
    height: 158,
    padding: '5px 10px 0 10px',
    fontSize: 16,
    flex: '0 1 10%'
  },
  bodyList: {
    paddingTop: '1rem',
    fontSize: 16,
    width: '30%',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  },
  footer: {
    background: `url(${process.env.PUBLIC_URL}/img/btm_bg.jpg) top center no-repeat`,
    backgroundSize: '100%',
    marginBottom: '4rem',
    paddingBottom: '2rem'
  },
  footerContact: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '10px 0',
    margin: 0,
    listStyleType: 'none',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 12
  }
})

export default styles