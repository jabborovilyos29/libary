import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Form.module.css";
import Input from "../../../shared/ui/Input/Input";
import { useInput } from "../../../shared/hooks/useInput";
import Modal from "../../../shared/ui/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../shared/hooks";
import { addUser } from "../../../features/slices/userList/userListSlice";
import { IUser } from "../../../features/models";

const telRegEx = /^\+?[1-9]\d{1,14}$/;
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface IField {
  id: number;
  value: string;
  error: {
    isFocused: boolean;
    isError: boolean;
    errorMessage: string;
  };
}

const emptyField = {
  id: null,
  value: "",
  error: {
    isFocused: false,
    isError: false,
    errorMessage: "",
  },
};

export default function Form() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fields, setFields] = useState<IField[]>([]);

  const name = useInput("", { isEmpty: true, maxLength: 20, minLength: 2 });
  const surname = useInput("", { isEmpty: true, maxLength: 20, minLength: 2 });
  const tel = useInput("", {
    isEmpty: true,
    maxLength: 9,
    minLength: 3,
    regex: telRegEx,
  });
  const email = useInput("", {
    isEmpty: true,
    maxLength: 50,
    minLength: 4,
    regex: emailRegEx,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddField = () => {
    setFields([...fields, { ...emptyField, id: Math.random() }]);
  };

  const handleChange = (item: IField, evt: ChangeEvent<HTMLInputElement>) => {
    let checked = {
      isFocused: false,
      isError: false,
      errorMessage: "",
    };

    if (!emailRegEx.test(item.value)) {
      checked.isError = true;
      checked.errorMessage = "invalid email";
    }

    if (item.value === "") {
      checked.isError = true;
      checked.errorMessage = "The empty input field";
    }

    const changedFields = fields?.map((field) => {
      if (field.id === item.id) {
        return {
          ...field,
          error: checked,
          value: evt.target.value,
        };
      } else {
        return field;
      }
    });

    setFields(changedFields);
  };

  const handleDeleteField = (id: number) => {
    const changedFields = fields?.filter((field) => field.id !== id);
    setFields(changedFields);
  };

  const handleBlur = (field: IField) => {
    let checked = {
      isFocused: false,
      isError: false,
      errorMessage: "",
    };

    if (!emailRegEx.test(field.value)) {
      checked.isError = true;
      checked.errorMessage = "invalid email";
    }

    if (field.value === "") {
      checked.isError = true;
      checked.errorMessage = "The empty input field";
    }

    const changedFields = fields?.map((item) => {
      if (item.id === field.id) {
        return {
          ...item,
          error: checked,
        };
      } else {
        return item;
      }
    });

    setFields(changedFields);
  };

  const handleFocus = (id: number) => {
    const changedFields = fields?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          error: { ...item.error, isFocused: true },
        };
      } else {
        return item;
      }
    });

    setFields(changedFields);
  };

  const isValid = () => {
    const validFields = fields?.every((field) => !field.error.isError);

    return (
      validFields &&
      name.inputValid &&
      surname.inputValid &&
      tel.inputValid &&
      email.inputValid
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: IUser = {
      id: Math.random(),
      name: name.value,
      phone: tel.value,
      email: email.value,
      website: "",
      username: "",
      address: undefined,
      company: undefined,
    };
    dispatch(addUser(data));
    openModal();
  };

  return (
    <>
      <article className={styles.form_article}>
        <form
          className={styles.form_container}
          onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
        >
          <div className={styles.form_container}>
            <Input
              value={name.value}
              name="name"
              placeholder="your name"
              required
              label={"Enter your name:"}
              type={"text"}
              isError={
                name.isDirty &&
                (name.isEmpty.value ||
                  name.maxLengthErr.value ||
                  name.minLengthErr.value)
              }
              errorText={
                name.isEmpty.message ||
                name.maxLengthErr.message ||
                name.minLengthErr.message
              }
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                name.onChange(evt)
              }
              onBlur={() => {
                name.onBlur();
              }}
              onFocus={() => {
                name.onFocus();
              }}
            />
            <Input
              value={surname.value}
              name={"surname"}
              placeholder={"your surname"}
              required
              label={" Enter your surname:"}
              type={"text"}
              isError={
                surname.isDirty &&
                (surname.isEmpty.value ||
                  surname.maxLengthErr.value ||
                  surname.minLengthErr.value)
              }
              errorText={
                surname.isEmpty.message ||
                surname.maxLengthErr.message ||
                surname.minLengthErr.message
              }
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                surname.onChange(evt);
              }}
              onBlur={() => {
                surname.onBlur();
              }}
              onFocus={() => {
                surname.onFocus();
              }}
            />
            <Input
              value={tel.value}
              name={"tel"}
              placeholder={"your tel number"}
              required
              label={"Enter your tel-number:"}
              type={"text"}
              isError={
                tel.isDirty &&
                (tel.isEmpty.value ||
                  tel.maxLengthErr.value ||
                  tel.minLengthErr.value ||
                  tel.regExErr?.value)
              }
              errorText={
                tel.isEmpty.message ||
                tel.maxLengthErr.message ||
                tel.minLengthErr.message ||
                tel.regExErr?.message
              }
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                tel.onChange(evt);
              }}
              onBlur={() => {
                tel.onBlur();
              }}
              onFocus={() => {
                tel.onFocus();
              }}
            />
            <Input
              value={email.value}
              name={"email"}
              placeholder={"your email"}
              required
              label={"Enter your email:"}
              type={"text"}
              isError={
                email.isDirty &&
                (email.isEmpty.value ||
                  email.maxLengthErr.value ||
                  email.minLengthErr.value ||
                  email.regExErr?.value)
              }
              errorText={
                email.isEmpty.message ||
                email.maxLengthErr.message ||
                email.minLengthErr.message ||
                email.regExErr?.message
              }
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                email.onChange(evt);
              }}
              onBlur={() => {
                email.onBlur();
              }}
              onFocus={() => {
                email.onFocus();
              }}
            />
            {fields?.map((field) => {
              return (
                <>
                  <Input
                    key={field.id}
                    value={field.value}
                    name={"email"}
                    placeholder={"your email"}
                    required
                    label={"Enter your email:"}
                    type={"text"}
                    isError={field.error.isError && !field.error.isFocused}
                    errorText={field.error.errorMessage}
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                      handleChange(field, evt);
                    }}
                    onBlur={() => {
                      handleBlur(field);
                    }}
                    onFocus={() => {
                      handleFocus(field.id);
                    }}
                    endContent={
                      <button
                        type={"button"}
                        onClick={() => {
                          handleDeleteField(field.id);
                        }}
                        className={styles.end_content_button}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                        >
                          <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
                        </svg>
                      </button>
                    }
                  />
                </>
              );
            })}
          </div>
          <div className={styles.button_group}>
            <button
              disabled={!isValid()}
              className={styles.submit_button}
              type={"submit"}
            >
              Send
            </button>
            <button
              type={"button"}
              onClick={() => {
                handleAddField();
              }}
              className={styles.submit_button}
            >
              Add new field for email
            </button>
          </div>
        </form>
      </article>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>User created</h3>
        <button
          type={"button"}
          onClick={() => {
            closeModal();
            navigate("/table");
          }}
          className={styles.submit_button}
        >
          Go to table page
        </button>
      </Modal>
    </>
  );
}
