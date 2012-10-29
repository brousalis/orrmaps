module ApplicationHelper
  def servers
    @servers ||= YAML.load_file('config/servers.yml')
  end

  def underscore(server)
    return server.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
  end

  def points_for_map(map)
    @map_ids_to_point_count ||= cache_counts(Point)

    @map_ids_to_point_count[map.id] || 0
  end

  def likes_for_map(map)
    @map_ids_to_like_count ||= cache_counts(Like)

    @map_ids_to_like_count[map.id] || 0
  end

  def users_on_server(server)
    Rails.cache.fetch("servers/#{server.id}/maps", :expires_in => 5.minutes) do
      User.includes(:map).where(:server_id => server.id)
    end
  end

  private
	
  def cache_counts(rel)
    Rails.cache.fetch("maps/#{rel.class.name.downcase}", :expires_in => 15.minutes) do
      rel.select("map_id, COUNT(*) as count").group('map_id').inject({}) do |cache, item|
        cache.merge(item.map_id => item.count.to_i)
      end
    end
  end
end
