import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  clearFormData,
  fillFormData,
  signIn,
  signUp,
} from '../actions/authActions';

/**
 * It returns a function that updates the form data state
 * @returns An array with a single element, a function.
 */
export const useLoginForm = ({ isSignup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formData = useSelector(state => state.auth.formData);

  const handleChange = e => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    dispatch(fillFormData(newFormData));
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (isSignup) dispatch(signUp(formData, navigate));
    else dispatch(signIn(formData, navigate));

    dispatch(clearFormData());
  };

  return [handleChange, handleSubmit];
};
