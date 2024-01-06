/*
useRef offre une solution pour interagir avec des éléments du DOM et stocker des valeurs persistantes sans provoquer de rendu.
Il offre une manière de conserver des références persistantes à des éléments DOM entre les rendus.
*/

/* On passe les propriétés suivantes pour pouvoir les utiliser dans Addtodo

{
  children,
  action,
  className,
  onSubmit,
}
*/

// "use client";

// import { useRef } from "react";

// const Form = ({ children, action, className, onSubmit }) => {
//   const ref = useRef(null); // Déclarer la référence ici

//   return (
//     <form
//       className={className}
//       onSubmit={onSubmit}
//       action={async (formData) => {
//         await action(formData);
//         ref.current?.reset();
//       }}
//     >
//       {children}
//     </form>
//   );
// };
// export default Form;

"use client";

import { useRef } from "react";

const Form = ({ children, action, className, onSubmit }) => {
  const ref = useRef(null); // Déclarer la référence ici

  return (
    <form
      className={className}
      onSubmit={onSubmit}
      action={async (formData) => {
        await action(formData);
        ref.current?.reset(); // Les ref ici pour vider le champs
      }}
      ref={ref}
    >
      {children}
    </form>
  );
};

export default Form;
