import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object().shape({
  name: yup.string().required('İsim alanı zorunludur.'),
  email: yup.string().email('Geçerli bir e-posta adresi girin.').required('E-posta alanı zorunludur.'),
  password: yup.string().required('Şifre alanı zorunludur.').min(6, 'Şifre en az 6 karakter olmalıdır.'),
  termsOfService: yup.boolean().oneOf([true], 'Kullanım şartlarını kabul etmelisiniz.'),
});

const Form = () => {
  const [response, setResponse] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      termsOfService: false,
    },
    validationSchema,
    onSubmit: (values, actions) => {
      axios
        .post('https://reqres.in/api/users', values)
        .then((res) => {
          setResponse(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
  });

  return (
    <div>
      <h2>Yeni Kullanıcı Formu</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">İsim:</label>
          <input id="name" type="text" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
        </div>
        <div>
          <label htmlFor="email">E-posta:</label>
          <input id="email" type="email" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Şifre:</label>
          <input id="password" type="password" {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
        </div>
        <div>
          <label htmlFor="termsOfService">
            <input
              id="termsOfService"
              type="checkbox"
              {...formik.getFieldProps('termsOfService')}
            />
            Kullanım Şartlarına Onay Veriyorum
          </label>
          {formik.touched.termsOfService && formik.errors.termsOfService && (
            <div>{formik.errors.termsOfService}</div>
          )}
        </div>
        {"formik.isValid: " + formik.isValid}<br />
        {"formik.isSubmitting: " + formik.isSubmitting}<br />
        <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          Gönder
        </button>
      </form>
      {response && (
        <div>
          <h3>Yanıt:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Form;
