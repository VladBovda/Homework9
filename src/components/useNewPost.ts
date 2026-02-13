import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { createExhibit } from "../store/slices/exhibitSlice";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  text: yup.string().trim().required("Post text is required"),
  image: yup.mixed<File>().required("Image is required"),
});

const useNewPost = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { text: "", image: null as File | null },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const result = await dispatch(createExhibit({ text: values.text, image: values.image! }));
      if (createExhibit.fulfilled.match(result)) {
        resetForm();
        setPreview(null);
        navigate("/");
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    formik.setFieldValue("image", file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    formik.setFieldValue("image", null);
    setPreview(null);
  };

  return {
    formik,
    preview,
    handleImageChange,
    removeImage,
  };
};

export default useNewPost;
