class ScoresController < ApplicationController
	

	def index
		@scores = Score.best_ten
	end

	def new
		@score = Score.new
		respond_to do |format|
			format.html { redirect_to root_url }
			format.js { render layout: false }
		end
	end

	def create
		@score = Score.create(score_params)
		redirect_to scores_path
	end


	private

	def score_params
		params.require(:score).permit(:time, :name)
	end
end
