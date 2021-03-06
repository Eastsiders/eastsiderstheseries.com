import React from "react"
import { Table, Icon, List } from "semantic-ui-react"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const SongRow = ({ song }) => (
  <Table.Row>
    <Table.Cell>
      <OutboundLink href={song.artist.url} target="_blank" rel="noopener">
        {song.artist.name}
      </OutboundLink>
    </Table.Cell>
    <Table.Cell>{song.title}</Table.Cell>
    <Table.Cell>
      <List horizontal size="mini">
        {song.urls.map(({ type, url }) => {
          return (
            <List.Item
              as={OutboundLink}
              href={url}
              target="_blank"
              rel="noopener"
              key={type}
            >
              <Icon name={type} title={type} size="large" />
            </List.Item>
          )
        })}
      </List>
    </Table.Cell>
  </Table.Row>
)

const Soundtrack = ({ songs }) => {
  return (
    <Table basic="very" compact="very">
      <Table.Body>
        {songs.map(song => {
          return <SongRow song={song} key={song.id} />
        })}
      </Table.Body>
    </Table>
  )
}

export default Soundtrack
