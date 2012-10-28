module ApplicationHelper
  def servers
    @servers ||= YAML.load_file('config/servers.yml')
  end

  def underscore(server)
    return server.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
  end

  def points_for_map(map)
    Rails.cache.fetch("maps/#{map.id}/points", :expires_in => 5.minutes) do
      Point.where(:map_id => map.id).count
    end
  end

  def likes_for_map(map)
    Rails.cache.fetch("maps/#{map.id}/likes", :expires_in => 5.minutes) do
      Like.where(:map_id => map.id).count
    end
  end

  def users_on_server(server)
    Rails.cache.fetch("servers/#{server.id}/maps", :expires_in => 5.minutes) do
      User.includes(:map).where(:server_id => server.id)
    end
  end
end
