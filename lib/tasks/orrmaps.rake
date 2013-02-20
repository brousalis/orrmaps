require 'nokogiri'
require 'open-uri'

namespace :orrmaps do
  task :get_reset do 
    doc = Nokogiri::HTML(open('http://gw2status.com/version_history'))
    res = doc.css('.latest').collect do |row|
      Time.parse(row.at("td[2]").text.gsub(/\(.*\)/, "").strip)
    end

    client = res[0]
    patch = res[1]

    reset_maps(client)
  end
 
  task :reset, [:date] => :environment do |t, args|
    args.with_defaults(:date => Time.now)
    reset_maps(args.date)
  end

  task :see_resets => :environment do
    print_resets
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

private 

def reset_maps(time)
  previous = $redis.get("last_reset")

  $redis.set("prev_reset", previous)
  $redis.set("last_reset", time)

  print_resets
end

def print_resets
  puts "Previous reset: #{$redis.get("prev_reset")}"
  puts "Latest reset: #{$redis.get("last_reset")}" 
end
 
