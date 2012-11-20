namespace :orrmaps do
  task :reset_maps do
    Point.where(:icon => '/assets/tiles/ore.png')
    Point.where(:icon => '/assets/tiles/wood.png')
  end

  task :reset_likes do
    Like.destroy_all
  end
end
