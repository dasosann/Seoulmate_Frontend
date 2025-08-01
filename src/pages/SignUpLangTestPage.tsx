// SignUpLangTestPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "../components/signup/ProgressBar";
import { NavigationButtons } from "../components/signup/NavigationButtons";
import AudioRecorder from "../components/signup/langTest/AudioRecorder";
import { uploadAudio } from "../components/signup/langTest/uploadAudio";

const SignUpLangTestPage = () => {
    const navigate = useNavigate();
    const [wavBlob, setWavBlob] = useState<Blob | null>(null);

    // 다음 버튼 핸들러
    const handleNext = async () => {
        if (wavBlob) {
            try {
                await uploadAudio(wavBlob);
                navigate("/signUp/hobby");
            } catch (err) {
                alert("오디오 업로드에 실패했습니다.");
            }
            } else {
            alert("녹음을 완료해주세요.");
        }
    };

    // 이전 핸들러
    const handlePrevious = () => {
        // -1이 이전 페이지로 돌아가게 함
        navigate(-1);
    };

  return (
    <main className="flex overflow-hidden flex-col items-center px-6 pt-[150px] pb-2 mx-auto w-full h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
        <header className="fixed mx-4 top-0 z-40 w-[360px] bg-white pb-4">
            <ProgressBar currentStep={2} />
            <div className="absolute text-2xl font-semibold left-0 text-zinc-900 top-[100px] w-full">
                <h1 className="text-2xl font-bold text-zinc-900">언어레벨 테스트</h1>
            </div>
        </header>

        <AudioRecorder onWavReady={setWavBlob} />

        <NavigationButtons
            selectedCount={10}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onCount={false}
        />
    </main>
  );
};

export default SignUpLangTestPage;
