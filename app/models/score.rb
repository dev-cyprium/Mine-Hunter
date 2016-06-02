class Score < ActiveRecord::Base
	scope :best_ten, ->() {
		Score.order(:time).first(10)
	}
end
