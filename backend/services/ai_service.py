import openai
from typing import Optional, Dict, Any
from config import get_settings
from core.logger import logger

settings = get_settings()

if settings.OPENAI_API_KEY:
    openai.api_key = settings.OPENAI_API_KEY

class AIService:
    """Service for AI/ML operations and integrations."""
    
    MODEL = settings.OPENAI_MODEL
    MAX_TOKENS = settings.OPENAI_MAX_TOKENS
    
    @classmethod
    async def generate_solution_recommendation(
        cls,
        problem_description: str,
        industry: Optional[str] = None,
        budget_range: Optional[str] = None
    ) -> str:
        """Generate AI-powered solution recommendations."""
        try:
            prompt = f"As an enterprise AI/ML solutions expert for USETAI LLC, provide a professional recommendation. Problem: {problem_description}"
            if industry:
                prompt += f" Industry: {industry}"
            if budget_range:
                prompt += f" Budget Range: {budget_range}"
            
            response = openai.ChatCompletion.create(
                model=cls.MODEL,
                messages=[
                    {"role": "system", "content": "You are an expert AI/ML solutions architect."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=cls.MAX_TOKENS,
                temperature=0.7
            )
            
            recommendation = response.choices[0].message.content
            logger.info("Solution recommendation generated successfully")
            return recommendation
            
        except Exception as e:
            logger.error(f"Error generating recommendation: {str(e)}")
            raise
    
    @classmethod
    async def analyze_business_case(
        cls,
        business_context: str,
        current_challenges: str
    ) -> Dict[str, Any]:
        """Analyze business case and suggest AI/ML applications."""
        try:
            prompt = f"Analyze this business situation for AI/ML opportunities: Business Context: {business_context} Current Challenges: {current_challenges}"
            
            response = openai.ChatCompletion.create(
                model=cls.MODEL,
                messages=[
                    {"role": "system", "content": "You are an enterprise AI transformation consultant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=cls.MAX_TOKENS * 2,
                temperature=0.6
            )
            
            analysis = response.choices[0].message.content
            logger.info("Business analysis completed")
            
            return {
                "analysis": analysis,
                "model_used": cls.MODEL,
                "tokens_used": response.usage.total_tokens
            }
            
        except Exception as e:
            logger.error(f"Error analyzing business case: {str(e)}")
            raise