export const getFormErrorMessage = () => {
  return {
    required: "Ce champ est requis.",
    password: {
      pattern: "Entre 8 et 64 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial."
    },
    email: {
      minLength: "L'email doit faire au moins 6 caractères.",
      maxLength: "L'email doit faire moins de 64 caractères.",
      format: "Email invalide."
    },
    article: {
      title: {
        minLength: "Le titre doit faire au moins 10 caractères.",
        maxLength: "Le titre doit faire moins de 64 caractères."
      },
      content: {
        minLength: "Le contenu doit faire au moins 3 caractères.",
        maxLength: "Le contenu doit faire moins de 2000 caractères."
      },
      comment: {
        minLength: "Le commentaire doit faire au moins 5 caractères.",
        maxLength: "Le commentaire doit faire moins de 256 caractères."
      }
    },
    subject: {
      title: {
        minLength: "Le titre doit faire au moins 2 caractères.",
        maxLength: "Le titre doit faire moins de 32 caractères."
      }
    },
    user: {
      profileName: {
        minLength: "Le profil doit faire au moins 3 caractères.",
        maxLength: "Le profil doit faire moins de 16 caractères."
      }
    }
  };
};
