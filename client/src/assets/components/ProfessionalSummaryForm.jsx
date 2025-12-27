import { Loader2, Sparkle } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {

  const {token} = useSelector(state=>state.auth)
  const [isGenerating , setIsGenerating] = useState(false)

  const generateSummary = async () => {
    try {
      setIsGenerating(true)
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post('/api/ai/enhance-pro-sum',{userContent : prompt} , { headers: { Authorization: token } })
      console.log(response)
      setResumeData(prev =>({...prev , professional_summary : response.data.enhancedContent}))

      
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

      
      
    }
    finally{
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>

        <button
          disabled={isGenerating} onClick={generateSummary}
          type="button"
          className="flex items-center gap-1 text-sm text-purple-600 bg-purple-50 px-3 py-1.5 rounded-md hover:bg-purple-100 transition -colors disabled:opacity-50"
        >
          {isGenerating ? (<Loader2 className="size-4 animate-spin"/>) : (
          <Sparkle className="size-4" />)}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
          
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={data || ""}
        onChange={(e) =>
          setResumeData(prev=>({
            ...prev,
            professional_summary : e.target.value
          }))
        }
        rows={5}
        className="
          w-full
          rounded-lg
          border border-gray-200
          bg-gray-50
          px-4 py-3
          text-sm text-gray-700
          placeholder-gray-400
          resize-none
          focus:outline-none
          focus:ring-2 focus:ring-purple-200
          focus:border-purple-400
        "
        placeholder="Highly analytical Data Analyst with 6 years of experience, transforming complex datasets into actionable insights using SQL, Python, and advanced visualization tools."
      />

      {/* Tip */}
      <p className="text-xs text-gray-400 text-center">
        Tip: Keep it concise (3–4 sentences) and focus on your most relevant
        achievements and skills.
      </p>
    </div>
  );
};

export default ProfessionalSummaryForm;
