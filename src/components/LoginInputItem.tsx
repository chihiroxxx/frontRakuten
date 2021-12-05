import { Tooltip } from '@chakra-ui/react';
import React, { ChangeEvent, Dispatch, memo, SetStateAction, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { MainContext } from '../providers/Provider';


interface Props{
  acitonTitle: string,
  actionComment: string,
  onClickAciton: any,
}

// interface FormInput{
//   username: string,
//   password: string
// }
interface FormStatus{
  username: string,
  password: string
//   username:{
//   required: string;
//   maxLength: number;
//   pattern: string;
// }
//   password:{
//     required: string;
//     minLength: number;
//     pattern: string;
//   }
}

const LoginInputItem = memo((props: Props) => {
  const { acitonTitle ,actionComment,onClickAciton} = props
  // onClickCangeSignupFlag ???




  // React Hook Formのところ-------------------------------
  const { register, handleSubmit, formState: {errors} , reset } = useForm<FormStatus>({criteriaMode: "all", shouldFocusError: true})
  const onSubmit: SubmitHandler<FormStatus> = (data) => {
    // console.log(data.password)
    // setName(() => data.username)
    // setPassword(() => data.password)
    onClickAciton(data.username, data.password)
    reset()
  };

  return (
    <>
              <form onSubmit={handleSubmit(onSubmit)}>

                <h1 className="cursor-default my-12 font-black tracking-tighter text-black hover:text-indigo-900 text-5xl title-font">
                  {acitonTitle} .
                <div className="mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">
                  {actionComment}</div>
                </h1>
                <div>
                <Tooltip label="小文字英数字で入力してください！" placement="top-start"
                bg="gray.500" closeDelay={500}>
                  <label className="text-base font-medium leading-relaxed text-blueGray-700">User Name <span className="tracking-tighter text-gray-400  text-sm font-medium" >※ lower case letter and number</span></label>
                  {/* <p className="mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">小文字英数字</p> */}
                  </Tooltip>
                  <input //onChange={onChangeName} name="username"
                  {...register("username", {"required":  true,maxLength: 16,pattern: /^[a-z0-9]+$/,})}
                  // {...register("maxLength", {maxLength: 16})}
                  // {...register("pattern", {pattern: /^[a-z]+$/i})}
                  type="name" placeholder="User Name "
                  className="border-2 border-gray-500 w-full px-4 py-2 mt-2 text-base text-indigo-900 border-transparent rounded-lg bg-blueGray-100 ext-blue-700 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
                  <span className="text-red-500 ">{errors.username?.types?.required && "User Nameが入力されていません"}<br/>
                  {errors.username?.types?.maxLength && "16文字以内で入力してください"}<br/>
                  {errors.username?.types?.pattern && "小文字英数字で入力してください"}<br/></span>
                  {/* autocomplete="" required=""*/}
                </div>
                <div className="mt-4">
                <Tooltip label="小文字英数字8文字以上で入力してください！" placement="top-start"
                bg="gray.500" closeDelay={500}>
                  <label className="text-base font-medium leading-relaxed text-blueGray-700">Password <span className="tracking-tighter text-gray-400  text-sm font-medium" >※ lower case letter and number, 8 or more characters </span></label>
                  </Tooltip>
                  <input //onChange={onChangePassword} name="password"
                   {...register("password", { required: true, minLength: 8 ,pattern: /^[a-z0-9]+$/})}
                   type="password" placeholder="Password"
                   className="border-2 border-gray-500 w-full px-4 py-2 mt-2 text-base text-indigo-900 border-transparent rounded-lg bg-blueGray-100 ext-blue-700 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
                   <span className="text-red-500 ">{errors.password?.types?.required && "Passwordが入力されていません"}<br/>
                   {errors.password?.types?.minLength && "8文字以上で入力してください"}<br/>
                   {errors.password?.types?.pattern && "小文字英数字で入力してください"}<br/></span>
                   {/* required="" minlength="6" */}
                </div>
                <div className="mt-2 text-right">
                </div>
                <button //onClick={onClickAciton}
                type="submit"
                className="bg-yellow-400 block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg  hover:bg-yellow-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black">
                  {acitonTitle}</button>
              </form>

              {/* <div onClick={onClickCangeSignupFlag}
              className="cursor-pointer">切り替え</div> */}
              {/* ここは共通化いらなそう！ */}

    </>
  )
}
)
export default LoginInputItem
