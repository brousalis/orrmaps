namespace :orrmaps do
  task :reset_maps do
    Point.destroy_all
    Like.destroy_all
  end

end
