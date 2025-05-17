import { create } from 'zustand';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '@/Api/Api';

export const useRegisterStore = create((set, get) => ({
    // Form state
    name: '',
    telefono: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    roles: '',
    direccion: '',
    provincia: '',
    ciudad: '',
    isSubmitting: false,

    // Update a single field
    setField: (field, value) => set({ [field]: value }),

    // Submit action
    submit: async () => {
        set({ isSubmitting: true });
        const {
            name, telefono, email, password, passwordConfirmation,
            roles, direccion, provincia, ciudad
        } = get();
        const data = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            telefono,
            roles,
            direccion,
            provincia,
            ciudad,
        };

        try {
            await axios.post(API_URL.REGISTER, data);
            await Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'Serás redirigido a la página de inicio de sesión.',
                confirmButtonText: 'Continuar',
            });
            return { success: true };
        } catch (error) {
            const resp = error.response;
            let mensajeUsuario = 'Hubo un problema al registrarte. Intenta de nuevo.';
            if (resp?.status === 422 && resp.data.errors) {
                const emailErrors = resp.data.errors.email;
                if (emailErrors?.length) {
                    mensajeUsuario = emailErrors[0].includes('taken')
                        ? 'El correo electrónico ya fue utilizado.'
                        : emailErrors[0];
                }
            }
            await Swal.fire({
                icon: 'error',
                title: 'Error de validación',
                text: mensajeUsuario,
                confirmButtonText: 'Aceptar',
            });
            return { success: false };
        } finally {
            set({ isSubmitting: false });
        }
    },
}));

