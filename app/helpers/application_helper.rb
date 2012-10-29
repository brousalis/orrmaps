module ApplicationHelper
  def servers
    @servers ||= YAML.load_file('config/servers.yml')
  end

  def underscore(server)
    return server.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
  end

  def points_for_map(map)
    @map_ids_to_point_count ||= Rails.cache.fetch("maps/points", :expires_in => 15.minutes) do
      cache_counts(Point)
    end

    @map_ids_to_point_count[map.id] || 0
  end

  def likes_for_map(map)
    @map_ids_to_like_count ||= Rails.cache.fetch("maps/likes", :expires_in => 15.minutes) do
      cache_counts(Like)
    end

    @map_ids_to_like_count[map.id] || 0
  end

  def users_on_server(server)
    Rails.cache.fetch("servers/#{server.id}/maps", :expires_in => 5.minutes) do
      User.includes(:map).where(:server_id => server.id)
    end
  end

  private
	
  def cache_counts(rel)
    rel.select("map_id, COUNT(*) as count").group('map_id').inject({}) do |cache, item|
      cache.merge(item.map_id => item.count.to_i)
    end
  end
end
