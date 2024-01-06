/* On passe les propriétés suivantes pour pouvoir les utiliser dans Addtodo

{
  name,
  type,
  placeholder,
  value,
}
*/
const Input = ({ name, type, placeholder, value }) => {
  return (
    <>
      <input
        className="w-full p-2 border-gray-200 border "
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;

/*
En résumé, ce code définit un composant fonctionnel Input qui prend des propriétés telles que name, type, placeholder, et value, 
puis les regroupe dans un objet pour une utilisation ultérieure dans un composant React.
*/
