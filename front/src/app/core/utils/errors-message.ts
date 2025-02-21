export const getFormErrorMessage = () => {
  return {
    required: "Ce champ est requis.",
    password: {
      pattern: "Longeur entre 8 et 64 caractères, au moins une minuscule, une majuscule, un chiffre et un caractère spécial."
    },
    email: {
      minLength: "L'email doit contenir au moins 6 caractères.",
      maxLength: "L'email doit contenir moins de 64 caractères.",
      format: "Format de l'email invalide."
    },
    article: {
      title: {
        minLength: "Le titre doit contenir au moins 10 caractères.",
        maxLength: "Le titre doit contenir moins de 64 caractères."
      },
      content: {
        minLength: "Le contenu doit contenir au moins 3 caractères.",
        maxLength: "Le contenu doit contenir moins de 2000 caractères."
      },
      comment: {
        minLength: "Le commentaire doit contenir au moins 5 caractères.",
        maxLength: "Le commentaire doit contenir moins de 256 caractères."
      }
    },
    subject: {
      title: {
        minLength: "Le titre doit contenir au moins 2 caractères.",
        maxLength: "Le titre doit contenir moins de 32 caractères."
      }
    },
    user: {
      profileName: {
        minLength: "Le nom de profil doit contenir au moins 3 caractères.",
        maxLength: "Le nom de profil doit contenir moins de 16 caractères."
      }
    }
  };
};
