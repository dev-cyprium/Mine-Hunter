100.times do |i|
	s = Score.new
	s.time = rand(50..100)
	s.name = "Example#{i}"
	s.save
end