'use client'

import { Label, LabelGroup, RelativeTime } from '@primer/react'
import { DataTable, Table } from '@primer/react/experimental'
import type { JSX } from 'react'

/** FastTrack Requests Data Table */
export const RequestsDataTable = (): JSX.Element => {
  return (
    <Table.Container>
      <Table.Title as="h2" id="requests">
        FastTrack Requests
      </Table.Title>
      <Table.Subtitle as="p" id="requests-subtitle">
        Open FastTrack Requests
      </Table.Subtitle>
      <DataTable
        aria-labelledby="repositories"
        aria-describedby="repositories-subtitle"
        data={[
          {
            id: 1,
            name: 'codeql-dca-worker',
            type: 'private',
            updatedAt: '2023-02-02T00:00:00Z',
            securityFeatures: {
              dependabot: ['dependabot'],
              codeScanning: ['code scanning']
            }
          }
        ]}
        columns={[
          {
            header: 'Repository',
            field: 'name',
            rowHeader: true
          },
          {
            header: 'Type',
            field: 'type',
            renderCell: (row) => {
              return <Label>{row.type.toLocaleUpperCase()}</Label>
            }
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            renderCell: (row) => {
              return <RelativeTime date={new Date(row.updatedAt)} />
            }
          },
          {
            header: 'Dependabot',
            field: 'securityFeatures.dependabot',
            renderCell: (row) => {
              return row.securityFeatures.dependabot.length > 0 ? (
                <LabelGroup>
                  {row.securityFeatures.dependabot.map((feature) => {
                    return (
                      <Label key={feature}>{feature.toLocaleUpperCase()}</Label>
                    )
                  })}
                </LabelGroup>
              ) : null
            }
          },
          {
            header: 'Code scanning',
            field: 'securityFeatures.codeScanning',
            renderCell: (row) => {
              return row.securityFeatures.codeScanning.length > 0 ? (
                <LabelGroup>
                  {row.securityFeatures.codeScanning.map((feature) => {
                    return (
                      <Label key={feature}>{feature.toLocaleUpperCase()}</Label>
                    )
                  })}
                </LabelGroup>
              ) : null
            }
          }
        ]}
      />
    </Table.Container>
  )
}
