import RegisterImg from '@/assets/Login.jpg';

const RegisterImage = () => {
  return (
    <div className="hidden md:block md:w-1/2">
      <img
        src={RegisterImg}
        loading="lazy"
        alt="Imagen de registro"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default RegisterImage; 