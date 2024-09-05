import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Formulario = () => {
    const { register, handleSubmit, reset, formState: {errors} } = useForm()
    const [formEnviado, setFormEnviado] = useState(false)

    const onSubmit = (data) => {
        console.log(data)
        setFormEnviado(true)
        setTimeout(()=>{
            setFormEnviado(false)
        }, 5000)
        reset()
    }

    return (
        <>
            <h2>Registrar</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='name'>Nome</label><br/>
                    <input type='text' id='name'
                        {...register('name', {required: "O nome é obrigatório."})}
                    />
                    {errors.name && <small style={{display: 'block'}}>{errors.name.message}</small>}
                </div>
                <br/>
                <div>
                    <label htmlFor='email'>E-mail</label><br/>
                    <input type='email' id='email'
                        {...register('email', {required: "O e-mail é obrigatório."})}
                    />
                    {errors.email && <small style={{display: 'block'}}>{errors.email.message}</small>}
                </div>
                <br/>
                <div>
                    <label htmlFor='password'>Senha</label><br/>
                    <input type='password' id='password'
                        {...register('password', {required: "A senha é obrigatória."})}
                    />
                    {errors.password && <small style={{display: 'block'}}>{errors.password.message}</small>}
                </div>
                <button style={{marginTop: 20}} type='submit'>Enviar</button>
                {formEnviado && <p>Formulário enviado com sucesso! {}</p>}
            </form>
        </>
    )
}

export default Formulario