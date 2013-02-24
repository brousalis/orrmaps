module ApplicationHelper
  include ActionView::Helpers::DateHelper

  def servers
    @servers ||= YAML.load_file('config/servers.yml')
  end

  def donors 
    YAML.load_file('config/donors.yml')
  end

  def maps_for_server(name)
    Rails.cache.fetch("servers/#{name}/map_ids", :expires_in => 5.minutes) do
      s = find_server(name)
      Point.connection.select_rows("SELECT COUNT(*) AS count_all, map_id AS map_id FROM \"points\" JOIN maps on points.map_id = maps.id WHERE maps.server_id = #{s.id} GROUP BY map_id ORDER BY 1 DESC LIMIT 2").map(&:last)
    end
  end

  def find_server(name)
    Rails.cache.fetch("servers/#{name}", :expires_in => 5.minutes) do
      Server.find_by_name(name)
    end
  end

  def underscore(server)
    return server.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
  end

  def points_for_map(map)
    @map_ids_to_point_count ||= cache_counts(Point)

    @map_ids_to_point_count[map.id] || 0
  end

  def likes_for_map(map)
    @map_cache ||= Hash[map.server.likes]
    @map_cache[map.id.to_s].to_i || 0
  end

  def users_on_server(server)
    Rails.cache.fetch("servers/#{server.id}/maps", :expires_in => 5.minutes) do
      User.includes(:map).joins(:map => [:points]).where(:server_id => server.id).uniq
    end
  end

  def time_ago(updated)
    time_ago_in_words(updated).sub("minute", "min").sub("less than a min", "< 1 min").sub("about", "")
  end

  def last_reset
    Time.parse($redis.get("last_reset"))
  end

  private

  def cache_counts(rel)
    Rails.cache.fetch("maps/#{rel.name.downcase}", :expires_in => 5.minutes) do
      rel.select("map_id, COUNT(*) as count").group('map_id').inject({}) do |cache, item|
        cache.merge(item.map_id => item.count.to_i)
      end
    end
  end
end
