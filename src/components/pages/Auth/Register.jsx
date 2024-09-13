import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context/UserContext';
import styles from './register.module.css';
import logo from '../../../assets/logo_reduzida.svg';
import imgPedreiro from '../../../assets/imgPedreiro.svg';
import InputMask from 'react-input-mask';
import Carregamento from '../../form/Carregamento';
import notify from '../../../utils/notificacao';

function Register() {
    const [user, setUser] = useState({});
    const [documentType, setDocumentType] = useState('CPF');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); 
    const { register } = useContext(Context);
    const navigate = useNavigate();

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    function handleDocumentTypeChange(e) {
        const selectedType = e.target.value;
        setDocumentType(selectedType);
        setUser({...user, documentType: selectedType});
    }

    function handleBlur(e) {
        const { name, value } = e.target;
        if (!value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: 'Este campo é obrigatório',
            }));
        } else {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let newErrors = {};

        // Validação
        if (!user.nome) {
            newErrors.nome = "Nome é obrigatório";
        }
        if (!user.email) {
            newErrors.email = "Email é obrigatório";
        }
        if (!user.senha) {
            newErrors.senha = "Senha é obrigatória";
        }
        if (!user.confirm_senha) {
            newErrors.confirm_senha = "Confirmação de senha é obrigatória";
        }
        if (user.senha !== user.confirm_senha) {
            newErrors.confirm_senha = "Senhas não coincidem";
        }
        if (documentType === 'CPF' && !user.cpf) {
            newErrors.cpf = "CPF é obrigatório";
        }
        if (documentType === 'CNPJ' && !user.cnpj) {
            newErrors.cnpj = "CNPJ é obrigatório";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            Object.values(newErrors).forEach(error => notify(error, "error"));
            return;
        }

        const standardizedUser = {
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            confirm_senha: user.confirm_senha,
            cpf: documentType === 'CPF' ? user.cpf : undefined,
            cnpj: documentType === 'CNPJ' ? user.cnpj : undefined,
        };

        setLoading(true); // Inicia o carregamento

        try {
            console.log('Dados Enviados:', standardizedUser); // Verifique os dados aqui
            await register(standardizedUser);
            // navigate('/validacaocode'); // Navega após o registro
        } catch (error) {
            console.error("Erro no registro:", error);
            notify("Erro ao registrar. Tente novamente.", "error");
        } finally {
            setLoading(false); // Encerra o carregamento
        }
    }

    return (
        <div className={styles.principal}>
            {loading && <Carregamento />} {/* Mostra o Loader se estiver carregando */}
            <div className={styles.form}>
                <div className={styles.logo}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className={styles.msg}>
                    <p className={styles.lets}>Vamos começar</p>
                    <p className={styles.desc}>Bem vindo ao vereda - Vamos criar sua conta!</p>
                </div>
                <div className={styles.form_enter}>
                    <form className={styles.formulario} onSubmit={handleSubmit}>
                        <div className={styles.p}>
                            <div className={styles.p1}>
                                <label>Nome</label>
                                <input
                                    type="text"
                                    name="nome"
                                    onChange={handleChange}
                                    className={styles.input_text}
                                    onBlur={handleBlur}
                                />
                                

                                <label>Tipo Documento</label>
                                <select
                                    name="documentType"
                                    className={styles.input_select}
                                    value={documentType}
                                    onChange={handleDocumentTypeChange} 
                                    onBlur={handleBlur}
                                >
                                    <option value="CPF">CPF</option>
                                    <option value="CNPJ">CNPJ</option>
                                </select>
                                

                                <label>Senha</label>
                                <input
                                    type="password"
                                    name="senha"
                                    onChange={handleChange}
                                    className={styles.input_text}
                                    onBlur={handleBlur}
                                />
                                
                            </div>

                            <div className={styles.p2}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    className={styles.input_text}
                                    onBlur={handleBlur}
                                />
                                

                                {documentType === 'CPF' && (
                                    <>
                                        <label>CPF</label>
                                        <InputMask
                                            mask="999.999.999-99"
                                            className={styles.input_text}
                                            name="cpf"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        
                                    </>
                                )}

                                {documentType === 'CNPJ' && (
                                    <>
                                        <label>CNPJ</label>
                                        <InputMask
                                            mask="99.999.999/9999-99"
                                            className={styles.input_text}
                                            name="cnpj"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        
                                    </>
                                )}

                                <label>Confirmar Senha</label>
                                <input
                                    type="password"
                                    name="confirm_senha"
                                    className={styles.input_text}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                
                            </div>
                        </div>
                        <button type="submit" className={styles.criar_conta_btn}>Criar Conta</button>
                        <p className={styles.msg_criar_conta}>Já tem uma conta? <span className={styles.login}><a href="/login">Login</a></span></p>
                    </form>
                </div>
            </div>
            <div className={styles.image}>
                <img src={imgPedreiro} alt="Imagem Pedreiro" className={styles.img_pedreiro} />
            </div>
        </div>
    );
}

export default Register;
