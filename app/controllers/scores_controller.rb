class ScoresController < ApplicationController
	def index
		@scores = Score.best_ten
	end
end
