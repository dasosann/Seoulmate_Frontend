import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProgressBar } from "../components/signup/ProgressBar";
import { ProfileImageUpload } from "../components/signup/profile/ProfileImageUpload";
import { FormField } from "../components/signup/profile/FormField";
import { DropdownField } from "../components/signup/profile/DropdownField";
import { TextAreaField } from "../components/signup/profile/TextAreaField";
import { SubmitButton } from "../components/signup/SubmitButton";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface FormData {
  firstName: string;
  lastName: string;
  DOB: string;
  country: string;
  bio: string;
  profileImage: string;
}

export const SignUpProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    DOB: '',
    country: '',
    bio: '',
    profileImage: ''
  });

  const nationalityOptions = [
    '대한민국', '미국', '일본', '중국', '영국', '독일', '프랑스', '기타'
  ];

  const handleFieldChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (file: File) => {
    setProfileFile(file);
    setFormData(prev => ({
      ...prev,
      profileImage: URL.createObjectURL(file)
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setBirthDate(date);
    setFormData(prev => ({
      ...prev,
      DOB: date ? format(date, "yyyy-MM-dd") : ''
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("DOB", formData.DOB);
    data.append("country", formData.country);
    data.append("bio", formData.bio);

    if (profileFile) {
      data.append("profileImage", profileFile);
    }

    console.log('FormData values:', [...data.entries()]);
    navigate("/signUp/langTest");
  };

  const isFormValid = formData.lastName && formData.firstName && formData.DOB && formData.country;

  return (
    <main className="flex flex-col items-center px-6 pt-[100px] pb-[300px] mx-auto w-full min-h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
      <header className="fixed mx-4 top-0 z-40 w-[360px] h-44 bg-white pb-4">
        <ProgressBar currentStep={1} />
        <div className="absolute text-2xl font-semibold left-0 text-zinc-900 top-[100px] bottom-10 w-full bg-white">
          <h1 className="text-2xl font-bold text-zinc-900">개인정보를 입력해주세요!</h1>
          <p className="absolute text-xs font-medium left-0 text-neutral-400 top-[40px] w-full">
            아래 이름, 생년월일, 국적은 정확한 정보를 기입해주세요!
            <br />
            입력하신 정보를 기반으로 프로필이 생성됩니다
          </p>
        </div>
      </header>

      <section className="ml-4 w-full font-medium h-[405px] max-w-[357px] mt-6">
        <ProfileImageUpload onImageChange={handleImageChange} previewUrl={formData.profileImage} />

        <FormField label="성" placeholder="성을 입력하세요." value={formData.lastName} onChange={handleFieldChange('lastName')} />

        <div className="mt-5">
          <FormField label="이름" placeholder="이름을 입력하세요." value={formData.firstName} onChange={handleFieldChange('firstName')} />
        </div>

        <div className="mt-5 w-full">
          <label className="block mb-1 text-sm font-medium text-zinc-900">생년월일</label>
          <DatePicker
            selected={birthDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            locale={ko}
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            placeholderText="생년월일을 선택하세요"
            className="w-full min-h-[45px] px-4 py-2 rounded-md border border-zinc-900 bg-zinc-50 text-sm text-zinc-900 cursor-pointer"
            wrapperClassName="w-full"
          />
        </div>


        <div className="mt-5">
          <DropdownField label="국적" placeholder="국적을 선택해주세요." value={formData.country} onChange={handleFieldChange('country')} options={nationalityOptions} />
        </div>

        <div className="mt-5">
          <TextAreaField label="자기소개" placeholder="자기소개를 입력해주세요" value={formData.bio} onChange={handleFieldChange('bio')} maxLength={120} />
        </div>
      </section>

      <SubmitButton onClick={handleSubmit} disabled={!isFormValid} />

      <div className="flex shrink-0 self-center mt-5 bg-black h-[5px] rounded-[100px] w-[140px]" />
    </main>
  );
};

export default SignUpProfilePage;
