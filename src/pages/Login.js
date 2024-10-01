// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import '../assets/styles/main.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import LoginService from '../services/login.service';

// function Login({ onLogin }) {
//   const navigate = useNavigate();

//   // Validation schema for the form
//   const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .email('Email không hợp lệ.')
//       .required('Email không được bỏ trống.'),
//     password: Yup.string()
//       .required('Mật khẩu không được bỏ trống.')
//       .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
//       .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!]).*$/, 'Mật khẩu phải chứa ít nhất một chữ viết hoa, một chữ viết thường, một số và một ký tự đặc biệt.'),
//   });

//   // Handle form submission
//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const response = await LoginService.login({
//         Email: values.email,
//         Password: values.password
//       });

//       toast.success('Login successful!');

//       // Store token and user info
//       localStorage.setItem('token', response.token);
//       localStorage.setItem('userEmail', values.email);

//       // Call onLogin to update parent component's state
//       onLogin(response.userId, values.email, response.maQuyen);

//       // Redirect based on role
//       switch (response.maQuyen) {
//         case 'MQSV':
//           navigate('/student/page');
//           break;
//         case 'MQNV':
//           navigate('/employee/page');
//           break;
//         case 'MQAD':
//           navigate('/admin/page');
//           break;
//         default:
//           navigate('/');
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section className="vh-90 d-flex justify-content-center align-items-center">
//       <div className="container-fluid h-custom bg-white text-dark">
//         <div className="row d-flex justify-content-center align-items-center h-70">
//           <div className="col-md-8 col-lg-6 col-xl-4">
//             <Formik
//               initialValues={{ email: '', password: '' }}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ isSubmitting }) => (
//                 <Form>
//                   <h2 className="text-center">Đăng nhập</h2>
//                   <p className="text-center">Welcome user, please login to continue.</p>
                  
//                   {/* Email input */}
//                   <div className="form-outline mb-4">
//                     <label className="form-label" htmlFor="email">Email address</label>
//                     <Field name="email" type="email" className="form-control form-control-lg" placeholder="Nhập email" />
//                     <ErrorMessage name="email" component="div" className="text-danger" />
//                   </div>

//                   {/* Password input */}
//                   <div className="form-outline mb-3">
//                     <label className="form-label" htmlFor="password">Password</label>
//                     <Field name="password" type="password" className="form-control form-control-lg" placeholder="Nhập password" />
//                     <ErrorMessage name="password" component="div" className="text-danger" />
//                   </div>

//                   <div className="text-center mt-4">
//                     <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} disabled={isSubmitting}>
//                       {isSubmitting ? 'Logging in...' : 'Login'}
//                     </button>
//                     <p className="text-center small fw-bold mt-2 mb-0">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Login;



// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import '../assets/styles/main.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import LoginService from '../services/login.service';

// function Login({ onLogin }) {
//   const navigate = useNavigate();

//   // Validation schema for the form
//   const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .email('Email không hợp lệ.')
//       .required('Email không được bỏ trống.'),
//     password: Yup.string()
//       .required('Mật khẩu không được bỏ trống.')
//       .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
//       .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!]).*$/, 'Mật khẩu phải chứa ít nhất một chữ viết hoa, một chữ viết thường, một số và một ký tự đặc biệt.'),
//   });

//   // Handle form submission
//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const response = await LoginService.login({
//         Email: values.email,
//         Password: values.password
//       });
  
//       // Save relevant data to local storage
//       localStorage.setItem('token', response.token);
//       localStorage.setItem('userEmail', values.email);
//       localStorage.setItem('ma_quyen', response.ma_quyen); // Store 'ma_quyen'
  
//       toast.success('Login successful!');
  
//       // Call onLogin to update parent component's state
//       onLogin(response.userId, values.email, response.ma_quyen);
  
//       // Redirect based on ma_quyen
//       switch (response.ma_quyen) {
//         case 'MQSV':
//           navigate('/student/page');
//           break;
//         case 'MQNV':
//           navigate('/employee/page');
//           break;
//         case 'MQAD':
//           navigate('/admin/page');
//           break;
//         default:
//           navigate('/');
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };
  

//   return (
//     <section className="vh-90 d-flex justify-content-center align-items-center">
//       <div className="container-fluid h-custom bg-white text-dark">
//         <div className="row d-flex justify-content-center align-items-center h-70">
//           <div className="col-md-8 col-lg-6 col-xl-4">
//             <Formik
//               initialValues={{ email: '', password: '' }}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ isSubmitting }) => (
//                 <Form>
//                   <h2 className="text-center">Đăng nhập</h2>
//                   <p className="text-center">Welcome user, please login to continue.</p>

//                   {/* Email input */}
//                   <div className="form-outline mb-4">
//                     <label className="form-label" htmlFor="email">Email address</label>
//                     <Field name="email" type="email" className="form-control form-control-lg" placeholder="Nhập email" />
//                     <ErrorMessage name="email" component="div" className="text-danger" />
//                   </div>

//                   {/* Password input */}
//                   <div className="form-outline mb-3">
//                     <label className="form-label" htmlFor="password">Password</label>
//                     <Field name="password" type="password" className="form-control form-control-lg" placeholder="Nhập password" />
//                     <ErrorMessage name="password" component="div" className="text-danger" />
//                   </div>

//                   <div className="text-center mt-4">
//                     <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} disabled={isSubmitting}>
//                       {isSubmitting ? 'Logging in...' : 'Login'}
//                     </button>
//                     <p className="text-center small fw-bold mt-2 mb-0">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Login;


import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../assets/styles/main.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginService from '../services/login.service';

function Login({ onLogin }) {
  const navigate = useNavigate();

  // Validation schema for the form
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email không hợp lệ.')
      .required('Email không được bỏ trống.'),
    password: Yup.string()
      .required('Mật khẩu không được bỏ trống.')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!]).*$/, 'Mật khẩu phải chứa ít nhất một chữ viết hoa, một chữ viết thường, một số và một ký tự đặc biệt.'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await LoginService.login({
        Email: values.email,
        Password: values.password
      });

      // Save relevant data to local storage
      localStorage.setItem('token', response.token);
      localStorage.setItem('userEmail', values.email);
      localStorage.setItem('ma_quyen', response.ma_quyen); // Store 'ma_quyen'

      toast.success('Login successful!');

      // Call onLogin to update parent component's state
      onLogin(response.userId, values.email, response.ma_quyen);

      // Redirect based on ma_quyen
      switch (response.ma_quyen) {
        case 'MQSV':
          navigate('/student/page');
          break;
        case 'MQNV':
          navigate('/employee/page');
          break;
        case 'MQAD':
          navigate('/admin/page');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      toast.error('Sai email hoặc password'); // Show the generic error message for any error
      setSubmitting(false); // Ensure the form submission state is reset
    }
      
  };

  return (
    <section className="vh-90 d-flex justify-content-center align-items-center">
      <div className="container-fluid h-custom bg-white text-dark">
        <div className="row d-flex justify-content-center align-items-center h-70">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h2 className="text-center">Đăng nhập</h2>
                  <p className="text-center">Welcome user, please login to continue.</p>

                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email address</label>
                    <Field name="email" type="email" className="form-control form-control-lg" placeholder="Nhập email" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>

                  {/* Password input */}
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <Field name="password" type="password" className="form-control form-control-lg" placeholder="Nhập password" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>

                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} disabled={isSubmitting}>
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="text-center small fw-bold mt-2 mb-0">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
