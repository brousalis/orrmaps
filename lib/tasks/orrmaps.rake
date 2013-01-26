namespace :o do
  task :reset, [:date] => :environment do |t, args|
    args.with_defaults(:date => Time.now)

    previous = $redis.get("last_reset")

    $redis.set("prev_reset", previous)
    $redis.set("last_reset", args.date)

    puts "Previous reset: #{previous}"
    puts "New reset: #{args.date}"
  end

  task :see_resets => :environment do
    puts "Previous reset: #{previous}"
    puts "New reset: #{args.date}"
  end

  task :clear_reset => :environment do
    $redis.del("prev_reset")
    $redis.del("last_reset")
  end

  task :reset_likes => :environment do
    puts "Likes destroyed"
    $redis.flushdb
  end
end
