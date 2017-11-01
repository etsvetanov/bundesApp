import { schema } from 'normalizr';


export const teamSchema = new schema.Entity(
   'teams',
   {},
   {idAttribute: 'TeamId'}
);

export const matchSchema = new schema.Entity(
   'matches',
   {
      Team1: teamSchema,
      Team2: teamSchema,
   },
   {idAttribute: 'MatchID'}
);

export const matchesSchema = new schema.Array(matchSchema);
