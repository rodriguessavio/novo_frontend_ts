import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
/* contexts */
import { Context } from '../../../context/UserContext'
import styles from './login.module.css'
import logo from '../../../assets/logo_reduzida.svg';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imgPedreiro from '../../../assets/imgPedreiro.svg';
import notify from '../../../utils/notificacao';

function Login() {
  const [user, setUser] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useContext(Context)
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let newErrors = {};
    console.log(user.email)
    console.log(user.senha)
    if (!user.email) {
      newErrors.email = "Email é obrigatório";
    }

    if (!user.senha) {
      newErrors.senha = "Senha é obrigatória";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (!user.email && user.password) {  
        notify("Email é obrigatório", "error");
      } else if (!user.password && user.email) {
        notify("Senha é obrigatória", "error");
      } else {
        notify("Todos os campos devem ser preenchidos!", "error");
      }
      return;
    }
    console.log(user);
    login(user)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formulario}>
        <center>
          <div className={styles.logo}><img src={logo} alt="" /></div>
        </center>
        <div className={styles.msg}>
          <p className={styles.msg_one}>Bem vindo de volta ao VEREDA</p>
          <p className={styles.msg_two}>Insira seu e-mail e senha para continuar</p>
        </div>

        <div className={styles.campos}>
          <form className={styles.tag_form} onSubmit={handleSubmit}>
            <label htmlFor="">Email</label>
            <input type="text" name='email' id='email' className={styles.inp_email} placeholder='Digite seu email' onChange={handleChange} />
            <label htmlFor="">Senha</label>
            <input type={showPassword ? 'text' : 'password'} name='senha' id='senha' className={styles.inp_senha} placeholder='Digite sua senha' onChange={handleChange} /> 
            <input type="submit" value="Entrar" className={styles.btn_entrar} />
          </form>
        </div>
        
        <div className={styles.msg_register}></div>
      </div>

      <div className={styles.img_pedreiro_login}>
        <img src={imgPedreiro} alt="" />
      </div>
    </div>
  )
}

export default Login;
